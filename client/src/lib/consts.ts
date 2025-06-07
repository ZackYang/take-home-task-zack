export const BRANDS = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Bytedance" },
  { id: 3, name: "Cisco" },
  { id: 4, name: "Dyson" },
  { id: 5, name: "Ebay" },
  { id: 6, name: "Facebook" },
  { id: 7, name: "Google" },
  { id: 8, name: "Huawei" },
  { id: 9, name: "Instagram" },
];

export const findBrand = (id: number) =>
  BRANDS.find((brand) => brand.id === id);

export const findBrandName = (id: number) => findBrand(id)?.name;
