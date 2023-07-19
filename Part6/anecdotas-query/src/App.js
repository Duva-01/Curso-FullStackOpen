import { NotificationProvider } from './NotificationContext';
import Notification from './components/Notification';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return (
    <NotificationProvider>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </NotificationProvider>
  );
};

export default App;
