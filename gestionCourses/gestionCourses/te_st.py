# -*- coding: utf-8 -*-
import logging
from logging.handlers import TimedRotatingFileHandler

# Configuration du logger
logger = logging.getLogger(__name__)
handler = TimedRotatingFileHandler('debug.log', when='midnight', backupCount=7)
formatter = logging.Formatter('%(levelname)s %(asctime)s %(module)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Messages de log
print("Envoi de messages de log...")
logger.debug('Ceci est un message DEBUG.')
logger.info('Ceci est un message INFO.')
logger.warning('Ceci est un message WARNING.')
logger.error('Ceci est un message ERROR.')
logger.critical('Ceci est un message CRITICAL.')
print("Messages de log envoyés.")
