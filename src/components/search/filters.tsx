import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import SelectedFilters from './selected-filters';
import { DietaryFilter } from './dietary-filter';
import { QueryParamProvider } from 'use-query-params';

export const ShopFilters: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <SelectedFilters lang={lang} />
      <CategoryFilter lang={lang} />
      {/* <QueryParamProvider><DietaryFilter lang={lang} /></QueryParamProvider> */}

      <BrandFilter lang={lang} />
    </div>
  );
};
