import {create} from 'zustand'
import PocketBase from 'pocketbase';
import {MeshStandardMaterial} from "three";

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!pocketBaseUrl) {
  throw new Error('VITE_POCKETBASE_URL is required');
}

export const pb = new PocketBase(pocketBaseUrl);

export const useConfiguratorStore = create((set, get) => ({
  categories: [],
  currentCategory: null,
  assets: [],
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
      expand: 'colorPalette',
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
  },
  setCurrentCategory: (category) => set({currentCategory: category}),
  changeAsset: (category, asset) => set(state => ({
    customization: {
      ...state.customization,
      [category]: {
        ...state.customization[category],
        asset,
      }
    }
  }))
}))