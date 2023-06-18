import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import '../stylesheets/dropdown.css';

const items = [
	{
		key: '1',
		label: (
			<a href="/">
				Trending
			</a>
		),
	},
	{
		key: '2',
		label: (
			<a href="/">
			New
			</a>
		),
	},
];

const App = () => (
  <>
    <Dropdown overlay={<Menu>{items.map(item => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}</Menu>} placement="bottom" arrow>
      <Button>{items[0].label}</Button>
    </Dropdown>
  </>
);

export default App;
