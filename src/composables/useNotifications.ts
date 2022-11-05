import { notification } from 'ant-design-vue';

export const useNotifications = () => {
  const config = {
    message: 'An error occurred',
    duration: 3,
    top: '54px',
  };
  const showErrorMessage = ({ description }: { description: string }): void => {
    notification.error({
      ...config,
      description,
    });
  };
  const showSuccessMessage = ({
    description,
  }: {
    description: string;
  }): void => {
    notification.success({
      ...config,
      description,
    });
  };
  return { showErrorMessage, showSuccessMessage };
};
