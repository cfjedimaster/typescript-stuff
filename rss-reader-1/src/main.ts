import Alpine from 'alpinejs';

type Cat = {
  name: string;
  breed: string;
  gender: 'male' | 'female';
};

Alpine.data('app', () => ({
  message:'Hello from Alpine!',
  cats: [] as Cat[],
  init() {
    this.cats.push({ name: 'Whiskers', breed: 'Siamese', gender: 'male' });
    this.cats.push({ name: 'Fluffy', breed: 'Persian', gender: 'female' });
  },
  meow(message:string = 'Meow!') {
    alert(message);
  }
}));

Alpine.start();
