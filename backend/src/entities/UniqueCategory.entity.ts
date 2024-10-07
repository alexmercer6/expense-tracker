import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UniqueCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category: string;
}
