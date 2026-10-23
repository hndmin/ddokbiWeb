import './app.css';
import { mount } from 'svelte';
import Service360 from './pages/Service360.svelte';

const app = mount(Service360, { target: document.getElementById('app') });

export default app;
