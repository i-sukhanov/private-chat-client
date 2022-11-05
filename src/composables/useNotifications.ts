import { notification } from 'ant-design-vue';

export const useNotifications = () => {
  const config = {
    duration: 3,
    top: '54px',
  };

  const showErrorMessage = ({ description }: { description: string }): void => {
    notification.error({
      ...config,
      message: 'An error occurred',
      description,
    });
  };

  const showSuccessMessage = ({
    description,
    message,
  }: {
    description: string;
    message: string;
  }): void => {
    notification.success({
      ...config,
      message,
      description,
    });
  };

  return { showErrorMessage, showSuccessMessage };
};
