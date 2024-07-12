import { useAppSelector } from '@/store';
import { selectUser } from '@/store/selectors';

const MiniApp = () => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <h1>Mini app</h1>
      <p>user: {user.userData?.id}</p>
    </div>
  );
};

export default MiniApp;
