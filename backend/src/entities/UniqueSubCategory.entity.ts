import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UniqueSubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category: string;
}
