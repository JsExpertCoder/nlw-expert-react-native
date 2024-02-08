import { 
  View, Text, 
  ScrollView, Alert,
  Linking
} from 'react-native'
import { KeyboardAwareScrollView,  } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from 'expo-router';  

import { ProductCartProps, useCartStore } from '@/stores/cart-store'

import { Header } from '@/components/header'
import { Product } from '@/components/product';
import formatCurrency from '@/utils/functions/format-currency';
import Input from '@/components/input';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from '@/components/link-button';
import { useState } from 'react';

const PHONE_NUMBER = '+244930237177';


export default function Cart() {
  const cartStore = useCartStore();
  const [address, setAddress] = useState('');
  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product) => 
    product.price * product.quantity + total , 0))

    function handleRemoveProduct(product: ProductCartProps) {
      Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            cartStore.remove(product.id);
          }
        }
      ]);
    }

    function handleOrder() {
      if(address.trim().length === 0)
        return Alert.alert('Pedido', 'Informe o endereço de entrega')

      const products = cartStore.products.map(product => 
        `\n ${product.quantity} ${product.title}`).join('')

      const message = `
      🍔NOVO PEDIDO.
      \n ENDEREÇO: ${address}
      \n PRODUTOS:
      ${products}
      \n VALOR TOTAL: ${total}`

      Linking.openURL(`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

      setAddress('');
      cartStore.clear();
      navigation.goBack();
    }

  return (
    <View className='flex-1 pt-8'>
      <Header title='Seu carrinho' />
      <KeyboardAwareScrollView>
        <ScrollView>
        <View className='flex-1 p-5'>
          {
            cartStore.products.length > 0 ?
            // <FlatList
            //   data={cartStore.products}
            //   keyExtractor={item => item.id}
            //   renderItem={({item}) => 
            //     <Product data={item} />
            //   }
            // />
            ( <View className='border-b border-slate-700'>
            {cartStore.products.map(product =>
                <Product key={product.id} data={product} onPress={() => handleRemoveProduct(product)}/>
              )}
            </View> )
              :
              (
                  <Text className='text-slate-400 text-center font-bold my-8'>
                    Seu carrinho está vazio
                  </Text>
              )
            }

            <View className='flex-row gap-2 items-center mt-5 mb-4'>
              <Text className='text-white text-xl font-subtitle'>Total:</Text>
              <Text className='text-lime-400 text-2xl font-heading'>{ total }</Text>
            </View>
            <Input 
              placeholder='Informe o endereço de entrega com Rua, Bairro, CEP, número e complemento...'
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType='next'
              // returnKeyLabel='Enviar'
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className='p-5 gap-5'>
          <Button onPress={handleOrder}>
            <Button.Text>Enviar pedido</Button.Text>
            <Button.Icon>
              <Feather name='arrow-right-circle' size={20}/>
            </Button.Icon>
          </Button>
          <LinkButton title='Voltar ao cardápio' href='/'/>
      </View>
    </View>
  )
}