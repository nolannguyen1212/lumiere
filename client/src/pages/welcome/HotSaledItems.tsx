import "./HotSaledItems.css";
import { HotSaledProducts } from "../../containers/Products/HotSaledProducts";
import FlashSaleIconURL from "../../assets/flashsale_icon.png";

export const HotSaledItems = () => {
  return (
    <div className="week-hot-sale-container">
      <h1>
        <img
          id="flashsale-icon"
          src={FlashSaleIconURL}
          alt="flashsale_icon"
          sizes="small"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAVFBMVEXu7u5mZmbx8fFbW1vAwMDIyMj29vaFhYXz8/PT09Ojo6NZWVmxsbGBgYFjY2NgYGDn5+fY2Nh3d3fQ0NCdnZ1sbGzh4eF7e3tSUlJra2uOjo7d3d3UXWnYAAACyElEQVR4nO3b63aaQBSGYR2sDrEBD2Da5v7vs4AgCKNmhUnT/fq9P0NEnszm4FpmsXii3HcfwD9NWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03abl9gdZFK/6hxd/j/kesdtGPLfYOF77YJnH6lcY+ui/QvuSHTYzKxIR2+3Mdo9etEa2PsB8n7dx9Rt6ftJ9L2tn7jLw/ae++/80HRJ7Wrd9XqzT82zitO22SPE8OQS9Ou/udL6uyPMSiadd/GmzFLQMvgGndqcUul8lxehw07fGizQOvkHZu3zrJSafd4ibZ7cbvBb5K+WN5HP/4VELvQH6fZdn4KaJ+ukjyLe7pwqd5Vl2MJlzfPDkGD8Ku1qXLrB7Z5WSYgZ8K6jE+X44mw3w7q1qfttgH3OuLtlGtP49xx50Mc3ckRXnFtan1+wG2PnfDq+uLJD8MuSa1l3O2X9196HZcVLfebMi1qHXpCFt7p6tbrWyzZcA1qB2N8a1hXhftI/OAa0/rxmMcHmZfXD4f9Fxz2sk523OHkAG2et7quNa0LjTG02G+wvara0wbPGd7bjfM/iW53pS/NVxb2jsrO1zd5tYz2tSsrintA2zHHY1xu7qHnS3t3THuhzmIPQ+zt6N9uLItd3zODrh2tOuPYGvU5Jy9bDksNla07x/D3v1DvL7Z0CZFORtbP4HY+AZRHsFaZ0QbByvtzKSdl7TSQrRP9f1kl65iZeC758/1fwX/c9Jyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnL7cm0fwHDUS1mjADeeAAAAABJRU5ErkJggg==";
          }}
        />
        WEEKEND HOT
        <span> SALE</span>
      </h1>
      <HotSaledProducts />
    </div>
  );
};
