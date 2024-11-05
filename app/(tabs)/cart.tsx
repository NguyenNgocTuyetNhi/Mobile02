import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const cartItems = [
  { id: 1, name: 'Bánh kem dâu', image: 'https://banhkemcaocap.com/wp-content/uploads/2020/01/banh-sinh-nhat-2-tang-tao-hinh-3d-cho-be-yeu-thich-khung-long.jpg', price: 200000, quantity: 1, selected: false },
  { id: 2, name: 'Bánh kem bắp', image: 'https://th.bing.com/th/id/OIP.LUtiYlyfHpL7a1P7L6Q4LAHaHa?rs=1&pid=ImgDetMain', price: 700000, quantity: 1, selected: false },
];

export default function CartScreen() {
  const [items, setItems] = useState(cartItems);
  const [modalVisible, setModalVisible] = useState(false);

  const increaseQuantity = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id: number) => {
    setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const toggleSelectItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (item.selected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handlePayment = (method: string) => {
    console.log(`Payment method selected: ${method}`);
    // Add payment handling logic here
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Link href="./home">
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.cartItemsContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.cartItem}>
            {/* Checkbox tùy chỉnh */}
            <TouchableOpacity onPress={() => toggleSelectItem(item.id)} style={styles.customCheckBox}>
              {item.selected ? (
                <Ionicons name="checkmark-circle" size={24} color="#06213e" />
              ) : (
                <Ionicons name="ellipse-outline" size={24} color="#ccc" />
              )}
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <View style={styles.cartItemQuantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cartItemPrice}>{item.price.toLocaleString()} VND</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng cho sản phẩm đã chọn:</Text>
        <Text style={styles.totalPrice}>{calculateTotal().toLocaleString()} VND</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('Tiền mặt')}>
              <Text style={styles.paymentText}>Thanh toán bằng tiền mặt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('Momo')}>
              <Text style={styles.paymentText}>Thanh toán bằng Momo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.checkoutButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  customCheckBox: {
    marginRight: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cartItemQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cartItemQuantity: {
    fontSize: 16,
    color: '#06213e',
    marginHorizontal: 12,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06213e',
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  paymentText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});