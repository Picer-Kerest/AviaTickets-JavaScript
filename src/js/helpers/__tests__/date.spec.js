import { formatDate } from "../date";

describe('formatDate', () => {
    it('check format', () => {
        expect(formatDate(1675360768116, 'yyyy')).toBe('2023');
    //    Date.now() = timestamp
    });
});