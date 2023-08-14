import { CreateMedicationDtoSchema } from './create-medication.dto';

describe('CreateMedicationDto', () => {
  beforeEach(async () => {});

  it('should be defined', () => {
    expect(CreateMedicationDtoSchema).toBeDefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({});
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: '500p',
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: '500p',
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: 500,
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      weight: 500,
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image: 'https',
      weight: 500,
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be fail', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: -1,
    });
    expect(error).not.toBeUndefined();
  });

  it('should CreateMedicationDtoSchema be success', async () => {
    const { error } = CreateMedicationDtoSchema.validate({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: 500,
    });
    expect(error).toBeUndefined();
  });
});
