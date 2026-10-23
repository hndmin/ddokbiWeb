import './app.css';
import { mount } from 'svelte';
import Index from './pages/Index.svelte';

const app = mount(Index, { target: document.getElementById('app') });

export default app;
