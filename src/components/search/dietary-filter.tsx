import React, { useEffect, useState } from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { useDietaryQuery } from '@framework/dietary/get-all-dietary';
import { usePathname } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import {
  useQueryParam,
  StringParam,
  QueryParamProvider,
  UrlUpdateType,
} from 'use-query-params';

export const DietaryFilter = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const [formState, setFormState] = useState<string[]>([]);
  const [queryDietaryParam, setQueryDietaryParam] = useQueryParam(
    'dietary',
    StringParam,
  );

  useEffect(() => {
    if (queryDietaryParam) {
      setFormState(queryDietaryParam.split(','));
    }
  }, [queryDietaryParam]);

  const {
    data: items,
    isLoading,
    error,
  } = useDietaryQuery({
    limit: 10,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const updatedFormState = formState.includes(value)
      ? formState.filter((item) => item !== value)
      : [...formState, value];

    setFormState(updatedFormState);

    setQueryDietaryParam(updatedFormState.join(','), 'replaceIn');
  }
  interface DietaryItem {
    id: string;
    name: string;
    slug: string;
  }

  interface DietaryFilterProps {
    items?: DietaryItem[] | null;
    formState: string[];
    handleItemClick: (slug: string) => void;
    lang: string;
    t: (text: string) => string;
  }

  const DietaryFilter: React.FC<DietaryFilterProps> = ({
    items,
    formState,
    handleItemClick,
    lang,
    t,
  }) => {
    const handleCheckBoxChange: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      const slug = event.target.value;
      handleItemClick(slug);
    };

    return (
      <div className="block">
        <div className="flex flex-col p-5 border rounded-md border-border-base">
          {items
            ?.slice(0, 3)
            ?.map((item) => (
              <CheckBox
                key={`${item.name}-key-${item.id}`}
                label={item.name}
                name={item.name.toLowerCase()}
                checked={formState.includes(item.slug)}
                value={item.slug}
                onChange={handleCheckBoxChange}
                lang={lang}
              />
            ))}
          {items?.length && items.length > 3 && (
            <div className="w-full">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Panel className="pt-4 pb-2">
                      {items.slice(3).map((item) => (
                        <CheckBox
                          key={`${item.name}-key-${item.id}`}
                          label={item.name}
                          name={item.name.toLowerCase()}
                          checked={formState.includes(item.slug)}
                          value={item.slug}
                          onChange={handleCheckBoxChange}
                          lang={lang}
                        />
                      ))}
                    </Disclosure.Panel>
                    <Disclosure.Button className="flex justify-center items-center w-full px-4 pt-3.5 pb-1 text-sm font-medium text-center text-brand focus:outline-none">
                      {open ? (
                        <>
                          <span className="inline-block ltr:pr-1 rtl:pl-1">
                            {t('text-see-less')}
                          </span>
                          <IoIosArrowUp className="text-brand-dark text-opacity-60 text-15px" />
                        </>
                      ) : (
                        <>
                          <span className="inline-block ltr:pr-1 rtl:pl-1">
                            {t('text-see-more')}
                          </span>
                          <IoIosArrowDown className="text-brand-dark text-opacity-60 text-15px" />
                        </>
                      )}
                    </Disclosure.Button>
                  </>
                )}
              </Disclosure>
            </div>
          )}
        </div>
      </div>
    );
  };
};
