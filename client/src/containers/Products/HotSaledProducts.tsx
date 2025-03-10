import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Grid, Pagination, Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Product } from "../../type";
import { OrderContext } from "../../contexts/OrderContext";
import { useCookies } from "react-cookie";
import { truncate } from "../../utilities/truncate";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export const HotSaledProducts = () => {
  const pageSize = 5;
  const [products, setProducts] = useState<Product[] | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { orderItems, setOrderItems }: any = useContext(OrderContext);
  const [cookies, ,] = useCookies(["access-token"]);

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

      toast.success(`Add ${product.name} To Cart!`);
    } catch (error) {
      toast.error("Something Bad Happened!");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url =
          import.meta.env.VITE_API_ROOT +
          `/api/products?is_hot_saled=true&&page=${currentPage}`;
        const response = await axios({
          method: "GET",
          url: url,
        });
        const newProducts = response.data["results"];
        const productsLength = response.data["count"];
        setPageNumber(Math.floor((productsLength + pageSize - 1) / pageSize));
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>) => {
    const newPage = parseInt((event.target as HTMLInputElement).innerText);
    setCurrentPage(newPage);
  };

  return products ? (
    <>
      <Grid container spacing={2} rowSpacing={5} justifyContent="center">
        {products.map((product: Product) => (
          <Grid key={product.id} item>
            <Paper
              sx={{
                p: 1,
                margin: "auto",
                width: 250,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <img
                className="thumbnail"
                src={product.imageUploadURL}
                alt={product.name}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAVFBMVEXu7u5mZmbx8fFbW1vAwMDIyMj29vaFhYXz8/PT09Ojo6NZWVmxsbGBgYFjY2NgYGDn5+fY2Nh3d3fQ0NCdnZ1sbGzh4eF7e3tSUlJra2uOjo7d3d3UXWnYAAACyElEQVR4nO3b63aaQBSGYR2sDrEBD2Da5v7vs4AgCKNmhUnT/fq9P0NEnszm4FpmsXii3HcfwD9NWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03abl9gdZFK/6hxd/j/kesdtGPLfYOF77YJnH6lcY+ui/QvuSHTYzKxIR2+3Mdo9etEa2PsB8n7dx9Rt6ftJ9L2tn7jLw/ae++/80HRJ7Wrd9XqzT82zitO22SPE8OQS9Ou/udL6uyPMSiadd/GmzFLQMvgGndqcUul8lxehw07fGizQOvkHZu3zrJSafd4ibZ7cbvBb5K+WN5HP/4VELvQH6fZdn4KaJ+ukjyLe7pwqd5Vl2MJlzfPDkGD8Ku1qXLrB7Z5WSYgZ8K6jE+X44mw3w7q1qfttgH3OuLtlGtP49xx50Mc3ckRXnFtan1+wG2PnfDq+uLJD8MuSa1l3O2X9196HZcVLfebMi1qHXpCFt7p6tbrWyzZcA1qB2N8a1hXhftI/OAa0/rxmMcHmZfXD4f9Fxz2sk523OHkAG2et7quNa0LjTG02G+wvara0wbPGd7bjfM/iW53pS/NVxb2jsrO1zd5tYz2tSsrintA2zHHY1xu7qHnS3t3THuhzmIPQ+zt6N9uLItd3zODrh2tOuPYGvU5Jy9bDksNla07x/D3v1DvL7Z0CZFORtbP4HY+AZRHsFaZ0QbByvtzKSdl7TSQrRP9f1kl65iZeC758/1fwX/c9Jyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnL7cm0fwHDUS1mjADeeAAAAABJRU5ErkJggg==";
                }}
              />
              <br />
              <a href={`/products/${product.id}`}>
                <strong>{truncate(product.name)}</strong>
              </a>
              <hr />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleClick(product)}
                >
                  Add to cart
                </Button>
                <h4>${product.price}</h4>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={pageNumber}
        page={currentPage}
        color="primary"
        size="large"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          marginTop: "20px",
        }}
        onChange={handlePageChange}
      />
    </>
  ) : (
    <CircularProgress />
  );
};
