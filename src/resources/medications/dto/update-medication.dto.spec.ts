import { UpdateMedicationDtoSchema } from './update-medication.dto';

describe('UpdateMedicationDto', () => {
  beforeEach(async () => {});

  it('should be defined', () => {
    expect(UpdateMedicationDtoSchema).toBeDefined();
  });

  it('should UpdateMedicationDtoSchema be fail', async () => {
    const { error } = UpdateMedicationDtoSchema.validate({});
    expect(error).toBeUndefined();
  });

  it('should UpdateMedicationDtoSchema be fail', async () => {
    const { error } = UpdateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: '500p',
    });
    expect(error).not.toBeUndefined();
  });

  it('should UpdateMedicationDtoSchema be fail', async () => {
    const { error } = UpdateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image: 'https',
      weight: 500,
    });
    expect(error).not.toBeUndefined();
  });

  it('should UpdateMedicationDtoSchema be fail', async () => {
    const { error } = UpdateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: -1,
    });
    expect(error).not.toBeUndefined();
  });

  it('should UpdateMedicationDtoSchema be fail', async () => {
    const { error } = UpdateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: 1001,
    });
    expect(error).not.toBeUndefined();
  });

  it('should UpdateMedicationDtoSchema be success', async () => {
    const { error } = UpdateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: 500,
    });
    expect(error).toBeUndefined();
  });
});
