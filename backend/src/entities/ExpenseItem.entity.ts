// src/entity/ExpenseItem.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExpenseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column('decimal')
  cost: number;

  @Column('simple-array')
  category: string[]; // List of strings

  @Column()
  isNecessary: boolean;

  @Column()
  isExpected: boolean;

  @Column()
  date: string; // UTC timestamp
}
