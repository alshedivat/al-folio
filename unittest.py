import unittest

class TestStringMethods(unittest.TestCase):

    def hello(self):
        return "hello"

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_hello(self):
        self.assertEqual(self.hello(), "hello")

if __name__ == '__main__':
    unittest.main()
