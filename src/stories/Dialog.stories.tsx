import { Dialog, DialogClose } from '../components/Dialog';
import './Dialog.stories.css';

const dialogHeader = "Lorem ipsum dolor sit amet";
const dialogContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {},
};

export const Default = {
  render: () => (
    <Dialog>
      <DialogClose />
      <h2>{dialogHeader}</h2>
      <p>{dialogContent}</p>
    </Dialog>
  )
};

export const CustomStyles = {
  render: () => (
    <Dialog className="custom-styles" id="custom-styles">
      <DialogClose />
      <h2>{dialogHeader}</h2>
      <p>{dialogContent}</p>
    </Dialog>
  )
};
