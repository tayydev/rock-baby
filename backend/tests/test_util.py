from games import _interleave


def test_interleave():
    a = [1, 2, 3]
    b = [4, 5, 6, 7, 8]
    assert _interleave([a, b]) == [1, 4, 2, 5, 3, 6, 7, 8]

    c = [4, 5, 6, 7, 8]
    d = [1, 2, 3]
    assert _interleave([c, d]) == [4, 1, 5, 2, 6, 3, 7, 8]
