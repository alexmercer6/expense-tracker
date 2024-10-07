import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UniqueItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  item: string;
}
