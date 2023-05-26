import { createRoot } from 'react-dom/client';
import { AppRoot } from './AppRoot';

const root = createRoot(document.getElementById('appRoot')!);

root.render(<AppRoot/>);
