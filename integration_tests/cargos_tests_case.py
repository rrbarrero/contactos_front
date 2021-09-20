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

base_url = "http://localhost:3000/"

fake = Faker("es_ES")


class TestCargos(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        username: str = os.getenv("USER")
        password: str = os.getenv("PASS")
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        time.sleep(2)
        cls.driver.maximize_window()
        cls.driver.get(base_url)
        cls.driver.find_element_by_name("email").send_keys(username)
        cls.driver.find_element_by_name("password").send_keys(password)
        cls.driver.find_element_by_id("loginSubmit").click()
        time.sleep(2)

    def test_cargos_are_listed(self):
        self.assertNotIn("No rows", self.driver.page_source)

    def test_crear_contacto(self):
        nav = self.driver.find_element_by_id("context-options-list")
        for link in nav.find_elements_by_css_selector("a"):
            if "Nuevo" in link.get_attribute("innerHTML"):
                link.click()
                break
        time.sleep(3)
        self._handle_select("tratamiento")
        self.driver.find_element_by_id("nombre").send_keys(fake.first_name())
        self.driver.find_element_by_id("apellidos").send_keys(
            fake.last_name() + " " + fake.last_name()
        )
        self.driver.find_element_by_id("cargo").send_keys(fake.job())
        self.driver.find_element_by_id("empresa").send_keys(fake.company())
        self.driver.find_element_by_id("direccion").send_keys(fake.street_address())
        self.driver.find_element_by_id("ciudad").send_keys(fake.city())
        time.sleep(1)
        self._handle_select("provincia")
        self._handle_select("pais")
        self._handle_select("colectivo")
        self._handle_select("subcolectivo")
        time.sleep(2)
        self.driver.find_element_by_id("next-button").click()
        time.sleep(4)

    def _handle_select(self, htmlID):
        _el = self.driver.find_element_by_id(htmlID)
        input_select = _el.find_element_by_css_selector("div")
        input_select.click()
        time.sleep(3)
        options = self.driver.find_elements_by_css_selector(
            "li.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root"
        )
        options[random.randint(0, len(options) - 1)].click()
        time.sleep(1)

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()


if __name__ == "__main__":
    unittest.main()
