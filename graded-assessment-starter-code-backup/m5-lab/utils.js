import { useRef, useEffect } from 'react';
import { getMenuItems } from './database';

export const SECTION_LIST_MOCK_DATA = [
    {
      title: 'Appetizers',
      data: [
        {
          id: '1',
          title: 'Pasta',
          price: '10',
        },
        {
          id: '3',
          title: 'Pizza',
          price: '8',
        },
      ],
    },
    {
      title: 'Salads',
      data: [
        {
          id: '2',
          title: 'Caesar',
          price: '2',
        },
        {
          id: '4',
          title: 'Greek',
          price: '3',
        },
      ],
    },
  ];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items. 
  // Each item has the following properties: "id", "title" and "price"

  const sectionData = [];

  data.forEach(element => {
    let categoryItem = sectionData.find((item) => item.title === element.category);

    if (categoryItem === undefined){
      //console.log('Create new section: ', element.category);
      let cat = {
        title: element.category,
        data: [],
      };
      categoryItem = cat;
    }
    //console.log('Add item menu to category: ', element.category);
    categoryItem.data.push({
      id: element.id,
      uuid: element.uuid,
      title: element.title,
      price: element.price,
    });      
    sectionData.push(categoryItem);      
  });

  console.log('Section list: ',JSON.stringify(sectionData));
  
  return sectionData;

  //return SECTION_LIST_MOCK_DATA;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
