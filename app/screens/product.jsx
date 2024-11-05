import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchProducts } from "./../api/products";

const numColumns = 2;
const itemWidth = Dimensions.get("window").width / numColumns - 30; // Điều chỉnh độ rộng sản phẩm để căn chỉnh khoảng cách

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts && Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Dữ liệu sản phẩm không phải là một mảng");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <FlatList
      data={products}
      key={numColumns}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={[styles.productContainer, { width: itemWidth }]}>
          <Image
            key={item.id} // Sửa key cho hình ảnh
            source={{
              uri: `http://localhost/mobile-backend/public/images/products/${item.image}`,
            }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Link to="/detail">
              {/* Bạn có thể thêm nội dung liên kết tại đây */}
            </Link>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Mua ngay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartIcon}>
                <Icon name="shopping-cart" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyMessage}>Không tìm thấy sản phẩm</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 10, // Thêm khoảng cách giữa các cột và mép màn hình
  },
  productContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10, // Thêm khoảng cách giữa các hàng
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  productDetails: {
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#F68620",
    marginVertical: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 4,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartIcon: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 4,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
});

export default ProductList;
