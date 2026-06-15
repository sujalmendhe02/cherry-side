import Hero from "../components/Hero";
import GiftsHampersRow from "../components/GiftsHampersRow";
import CollectionsGrid from "../components/CollectionsGrid";
import CustomPackaging from "../components/CustomPackaging";
import HamperAddons from "../components/HamperAddons";
import IntentFilters from "../components/IntentFilters";

export default function Home() {
  return (
    <div className="home-page-container">
      <Hero />
      <GiftsHampersRow />
      <CollectionsGrid />
      <CustomPackaging />
      <HamperAddons />
      <IntentFilters />
      
    </div>
  );
}