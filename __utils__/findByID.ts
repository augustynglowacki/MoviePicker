import Enzyme from 'enzyme';
export type Shallow = Enzyme.ShallowWrapper<
  any,
  Readonly<{}>,
  React.Component<{}, {}, any>
>;

export const findByID = (wrapper: Shallow, value: string) => {
  return wrapper.find({testID: value});
};
