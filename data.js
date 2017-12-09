import Faker from 'faker';
import _ from 'lodash';
import { Customer, Palette, Audience, Platform } from './server/models';
export default () => {
  const data = _.times(10, (i) => {
    const { name, phone, internet, random, company, commerce, image } = Faker,
      u = random.uuid(), a = company.bsNoun(),
      x = name.firstName(i), b = company.bsNoun(),
      y = name.lastName(i), c = company.bsNoun(),
      z = random.uuid(),
      customer = {
        keyID: u,
        _name: `${x} ${y}`,
        sex: (i % 2 === 0 ? 'MALE' : 'FEMALE'),
        email: internet.email(x, y),
        phone: parseInt(phone.phoneNumber("2348#########"), 10),
        palettes: [z]
      },
      palette = {
        keyID: z,
        title: company.catchPhraseNoun(),
        caption: company.catchPhraseDescriptor(),
        category: commerce.department(),
        tags: [a, b, c],
        src_file: image.imageUrl(),
        author: u
      },
      platform = {
        title: company.catchPhraseNoun(),
        category: commerce.department(),
        src_file: image.imageUrl()
      },
      audience = {
        _name: `${x} ${y}`,
        sex: (i % 2 === 0 ? 'MALE' : 'FEMALE'),
        email: internet.email(x, y),
        phone: parseInt(phone.phoneNumber("2348#########"), 10),
        interests: [a, b, c]
      }
    return { customer, palette, platform, audience }
  });
  return data.map(({ customer, palette, platform, audience }) => {
    return [
      Customer.set(customer, Customer.disconnect),
      Palette.set(palette, Palette.disconnect),
      Platform.set(platform, Platform.disconnect),
      Audience.set(audience, Audience.disconnect)
    ]
  });
};