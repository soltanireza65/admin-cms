import { CategoryApi } from './index';
describe('Published Category EndPoint', () => {
	test('Add Category', async () => {
		const result = await CategoryApi.addCategory({
			title: '3علمی',
			englishTitle: 'elmi3',
			description: ' dsfds '
		});
		expect(result.status).toBe(1);
	});
	test('Get all category', async () => {
		const result = await CategoryApi.getAllCategories();
		expect(result.status).toBe(1);
	});
});
