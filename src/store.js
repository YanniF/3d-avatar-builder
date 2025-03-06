import {create} from 'zustand'
import PocketBase from 'pocketbase';
import {MeshStandardMaterial} from "three";
import {randInt} from "three/src/math/MathUtils.js";
import {color} from "three/src/Three.TSL.js";

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!pocketBaseUrl) {
  throw new Error('VITE_POCKETBASE_URL is required');
}

export const pb = new PocketBase(pocketBaseUrl);

export const useConfiguratorStore = create((set, get) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  lockedGroups: {},
  skin: new MeshStandardMaterial({color: '#f5c6a5', roughness: 1}),
  customization: {},
  download: () => {
  },
  setDownload: (download) => set({download}),
  updateColor: (color) => {
    set(state => ({
      customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color
        }
      }
    }))

    if (get().currentCategory.name === 'Head') {
      get().updateSkin(color)
    }
  },
  updateSkin: (color) => {
    get().skin.color.set(color)
  },
  fetchCategories: async () => {
    const categories = await pb.collection('CustomizationGroups').getFullList({
      sort: '+position',
      expand: 'colorPalette,cameraPlacement',
    });

    const assets = await pb.collection('CustomizationAssets').getFullList({
      sort: '-created',
    });

    const customization = {}

    categories.forEach((category) => {
      category.assets = assets.filter(asset => asset.group === category.id)
      customization[category.name] = {
        color: category.expand?.colorPalette?.colors?.[0] ?? ''
      }

      if (category.startingAsset) {
        customization[category.name].asset = category.assets.find(asset => asset.id === category.startingAsset);
      }
    })

    set({categories, assets, currentCategory: categories[0], customization});
    get().applyLockedAssets()
  },
  setCurrentCategory: (category) => set({currentCategory: category}),
  changeAsset: (category, asset) => {
    set(state => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        }
      }
    }))

    get().applyLockedAssets()
  },
  randomize: () => {
    const customization = {}

    get().categories.forEach((category) => {
      const randomColor = category.expand?.colorPalette?.colors?.[randInt(0, category.expand.colorPalette.colors.length - 1)];

      const randomAssetNumber = randInt(0, category.assets.length - 1)
      let randomAsset = category.assets[randomAssetNumber];

      if (category.removable && randomAssetNumber === 0) {
        randomAsset = null
      }

      customization[category.name] = {
        asset: randomAsset,
        color: randomColor,
      }

      if (category.name === 'Head') {
        get().updateSkin(randomColor)
      }
    })

    set({customization});
    get().applyLockedAssets()
  },
  applyLockedAssets: () => {
    const customization = get().customization;
    const categories = get().categories;
    const lockedGroups = {}

    Object.values(customization).forEach((category) => {
      category.asset?.lockedGroups?.forEach((group) => {
        const categoryName = categories.find(category => category.id === group)?.name

        if (!lockedGroups[categoryName]) {
          lockedGroups[categoryName] = [];
        }

        const lockingAssetCategoryName = categories.find(item => item.id === category.asset.group).name

        lockedGroups[categoryName].push({
          name: category.asset.name,
          categoryName: lockingAssetCategoryName
        })
      })
    })

    set({lockedGroups});
  }
}))