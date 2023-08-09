import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  weight: number;

  @Column({ length: 100 })
  code: string;

  @Column({
    type: 'text'
  })
  image: string;
}
