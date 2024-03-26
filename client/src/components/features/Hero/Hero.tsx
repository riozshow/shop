import CouponsBox from '../CouponsBox/CouponsBox';
import DiscountsBox from '../DiscountsBox/DiscountsBox';
import TopSellers from '../TopSellers/TopSellers';

function Hero() {
  return (
    <div className="list-wrapper">
      <DiscountsBox />
      <CouponsBox />
      <TopSellers />
    </div>
  );
}

export default Hero;
