import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  serial_number: string;

  @Column({
    enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'],
  })
  model: 'Lightweight' | 'Middleweight' | 'Cruiserweight' | 'Heavyweight';

  @Column()
  weight: number;

  @Column()
  battery: number;

  @Column({
    enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'],
  })
  state:
    | 'IDLE'
    | 'LOADING'
    | 'LOADED'
    | 'DELIVERING'
    | 'DELIVERED'
    | 'RETURNING';
}
