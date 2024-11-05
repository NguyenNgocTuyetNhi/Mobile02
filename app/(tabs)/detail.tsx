import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Image URL for the product
const productImage = "https://img.hoidap247.com/picture/answer/20211018/large_1634522857966.jpg";

export default function ProductDetailScreen() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ['S', 'M', 'L', 'XL'];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: productImage }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Details */}
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>BÁNH KEM</Text>
        <Text style={styles.productDescription}>
          Mô tả chi tiết sản phẩm sẽ được hiển thị ở đây.
        </Text>
        <Text style={styles.productPrice}>150.000đ</Text>

        {/* Size Selection */}
        <Text style={styles.sizeLabel}>Chọn kích thước:</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText, 
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Mua Ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Related Products */}
      <View style={styles.relatedProductsContainer}>
        <Text style={styles.relatedProductsTitle}>Sản Phẩm Liên Quan</Text>
        <View style={styles.productRow}>
          <View style={styles.productItem}>
            <Image
              source={{ uri: "https://th.bing.com/th/id/OIP.APST0TKv_H6UeO8M0OOSHQHaHa?rs=1&pid=ImgDetMain" }}
              style={styles.relatedProductImage}
            />
            <Text style={styles.productName}>Bánh kem dâu</Text>
            <Text style={styles.productPrice}>250.000đ</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Mua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productItem}>
            <Image
              source={{ uri: 'https://th.bing.com/th/id/OIP.db7JjwqTWDBSSenZ-epuSQAAAA?rs=1&pid=ImgDetMain' }}
              style={styles.relatedProductImage}
            />
            <Text style={styles.productName}>Bánh kem bắp</Text>
            <Text style={styles.productPrice}>300.000đ</Text>
            <TouchableOpacity style={styles.buyButton}> 
              <Text style={styles.buyButtonText}>Mua</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  sizeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  relatedProductsContainer: {
    marginBottom: 20,
  },
  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  relatedProductImage: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 4,
  },
});
