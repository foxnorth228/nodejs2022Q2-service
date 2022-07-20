export abstract class elementPrismaService<T> {
  abstract findOne(id: string): Promise<T | null>;
  abstract findAll(): Promise<Array<T>>;
  abstract create(elem: T): Promise<T>;
  abstract update(id: string, elem: T): Promise<T>;
  abstract delete(id: string): void;
}
