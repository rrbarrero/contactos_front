import os
import time
import unittest
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from faker import Faker
import random

base_url = 'http://localhost:3000/'

fake = Faker('es_ES')


class TestCargos(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        username: str = os.getenv("USERNAME")
        password: str = os.getenv("PASSWORD")
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        time.sleep(2)
        cls.driver.maximize_window()
        cls.driver.get(base_url)
        cls.driver.find_element_by_name('email').send_keys(username)
        cls.driver.find_element_by_name('password').send_keys(password)
        cls.driver.find_element_by_id("loginSubmit").click()
        time.sleep(2)
        return super().setUpClass()

    def test_cargos_are_listed(self):
        rows: list = self.driver.find_elements_by_class_name("MuiDataGrid-row")
        self.assertEqual(len(rows), 15)




    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()



if __name__ == '__main__':
    unittest.main()