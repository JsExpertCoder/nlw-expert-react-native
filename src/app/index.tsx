import React, { useState, useRef } from 'react'
import { 
  View, Text, FlatList,
  SectionList,
} from 'react-native'
import { Link } from 'expo-router';

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products';

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { Product } from '@/components/product';
import { useCartStore } from '@/stores/cart-store';

export default function Home() {
  const cartStore = useCartStore();
  const  [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);
    const sectionIndex = CATEGORIES.findIndex(category => category === selectedCategory)
    sectionListRef.current?.scrollToLocation({
      animated: true,
      sectionIndex,
      itemIndex: 0,
    });
    
  }

  return (
    <View className='flex-1 pt-8'>
      <Header title='Faça seu pedido' cardQuantityItems={cartQuantityItems}/>
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={({item}) => 
          <CategoryButton 
            title={item} 
            isSelected={category === item}
            onPress={() => handleCategorySelected(item)} 
          />
        }
        horizontal
        className='max-h-10 mt-10'
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
      <SectionList 
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => 
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item}/>
          </Link>}
        renderSectionHeader={({ section: {title}}) =>
            <Text className='text-white text-xl font-heading mt-8 mb-3'>
            {title}
          </Text>
        }
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}