import "./ProductView.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../contexts/OrderContext";
import toast from "react-hot-toast";
import { Product } from "../../type";
import { truncate } from "../../utilities/truncate";
import { MarkdownComponent } from "../../utilities/markdown";
import { parser } from "../../utilities/parser";

export const ProductView = () => {
  const params = useParams();
  const id = params.productId;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [, setDigital] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState<string | null>("");
  const [categories, setCategories] = useState<string | null>("");
  const [model, setModel] = useState<string | null>("");
  const [description, setDescription] = useState<string[] | null>([]);
  const [instock, setInStock] = useState(true);
  const [updatedBy, setUpdatedBy] = useState("");
  const [cookies, ,] = useCookies(["access-token"]);

  const [product, setProduct] = useState<Product | null>(null);
  const { orderItems, setOrderItems }: any = useContext(OrderContext);

  const handleClick = async (product: any) => {
    setOrderItems([
      ...orderItems.filter(
        (item: any) => item.product !== product.id && item.id !== product.id
      ),
      product,
    ]);

    try {
      const url = import.meta.env.VITE_API_ROOT + "/api/order-items";
      const headers = {
        Authorization: "Bearer " + cookies["access-token"],
      };
      const data = {
        product_id: product.id,
      };

      await axios({
        method: "POST",
        url: url,
        headers: headers,
        data: data,
      });

      toast.success(`Add ${truncate(product.name)} To Cart!`);
    } catch (error) {
      toast.error("Something Bad Happened!");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const url = import.meta.env.VITE_API_ROOT + `/api/products/${id}`;
      const response: any = await axios({
        method: "GET",
        url: url,
      });

      const product: any = response["data"]["product"];

      const descriptionList = await parser(product["description"]);

      setProduct(product);
      setName(product["name"]);
      setPrice(product["price"]);
      setDigital(product["digital"]);
      setImageUrl(product["imageUploadURL"]);
      setInStock(product["instock"]);
      setBrand(product["brand"]);
      setCategories(product["categories"]);
      setModel(product["model"]);
      setDescription(descriptionList);
      setUpdatedBy(product["updatedBy"]);
    };

    getProduct();
  }, []);

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          className="product-image"
          src={imageUrl}
          alt={`product-${id}-${name}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAVFBMVEXu7u5mZmbx8fFbW1vAwMDIyMj29vaFhYXz8/PT09Ojo6NZWVmxsbGBgYFjY2NgYGDn5+fY2Nh3d3fQ0NCdnZ1sbGzh4eF7e3tSUlJra2uOjo7d3d3UXWnYAAACyElEQVR4nO3b63aaQBSGYR2sDrEBD2Da5v7vs4AgCKNmhUnT/fq9P0NEnszm4FpmsXii3HcfwD9NWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03abl9gdZFK/6hxd/j/kesdtGPLfYOF77YJnH6lcY+ui/QvuSHTYzKxIR2+3Mdo9etEa2PsB8n7dx9Rt6ftJ9L2tn7jLw/ae++/80HRJ7Wrd9XqzT82zitO22SPE8OQS9Ou/udL6uyPMSiadd/GmzFLQMvgGndqcUul8lxehw07fGizQOvkHZu3zrJSafd4ibZ7cbvBb5K+WN5HP/4VELvQH6fZdn4KaJ+ukjyLe7pwqd5Vl2MJlzfPDkGD8Ku1qXLrB7Z5WSYgZ8K6jE+X44mw3w7q1qfttgH3OuLtlGtP49xx50Mc3ckRXnFtan1+wG2PnfDq+uLJD8MuSa1l3O2X9196HZcVLfebMi1qHXpCFt7p6tbrWyzZcA1qB2N8a1hXhftI/OAa0/rxmMcHmZfXD4f9Fxz2sk523OHkAG2et7quNa0LjTG02G+wvara0wbPGd7bjfM/iW53pS/NVxb2jsrO1zd5tYz2tSsrintA2zHHY1xu7qHnS3t3THuhzmIPQ+zt6N9uLItd3zODrh2tOuPYGvU5Jy9bDksNla07x/D3v1DvL7Z0CZFORtbP4HY+AZRHsFaZ0QbByvtzKSdl7TSQrRP9f1kl65iZeC758/1fwX/c9Jyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnL7cm0fwHDUS1mjADeeAAAAABJRU5ErkJggg==";
          }}
        />
      </div>
      <div className="product-info">
        <div>
          <div>
            <h2>{name}</h2>
          </div>
          {description ? (
            <>
              <hr />
              <div>
                <h3>Description</h3>
                <MarkdownComponent markdownContents={description} />
              </div>
            </>
          ) : (
            <></>
          )}
          <hr />
          <p>
            <b>Brand:</b> <span>{brand}</span>
          </p>
          <p>
            <b>Categories:</b> <span>{categories}</span>
          </p>
          <p>
            <b>Models:</b> <span>{model}</span>
          </p>
          {instock ? (
            <p style={{ color: "green" }}>In Stock</p>
          ) : (
            <p style={{ color: "red" }}>Out Of Stock</p>
          )}
          <div>
            <h3>${price}</h3>
          </div>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleClick(product)}
          >
            Add to cart
          </Button>
          <p>
            Updated By: <span style={{ color: "green" }}>{updatedBy}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
