import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Drone } from './drone.entity';
import { Medication } from './medication.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  drone_id: number;

  @ManyToOne((type) => Drone, (drone) => drone.serial_number)
  @JoinColumn({ name: 'drone_id', referencedColumnName: 'id' })
  drone: Drone;

  @Column({})
  medication_id: number;

  @ManyToOne((type) => Medication, (medication) => medication.name)
  @JoinColumn({ name: 'medication_id', referencedColumnName: 'id' })
  medication: Medication;

  @Column()
  capacity: number;

  @Column()
  weight: number;

  @Column()
  battery: number;

  @Column({
    enum: ['active', 'finished'],
  })
  state: 'active' | 'finished';

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
