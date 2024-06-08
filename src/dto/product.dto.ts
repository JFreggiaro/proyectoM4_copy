export class ProductDto {
  /** Nombre del producto @example Iphone15 */
  name: string;

  /** Descripcion del producto @example The_best_smartphone_in_the_world */
  description: string;

  /** Precio del producto @example 10000 */
  price: number;

  /** Stock del producto @example 10 */
  stock: number;

  /** Categoría del producto @example Smartphone */
  category: string;

  /** Imagen del producto @example https://example.com/iphone15.jpg */
  imgUrl?: string;
}
