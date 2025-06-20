import os
import pandas as pd
import plotly.express as px
import streamlit as st
from dotenv import load_dotenv

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv() 

st.set_page_config(
    page_title="Analisador de Investimentos",
    layout="wide",  # Faz com que a aplicação use toda a largura
    initial_sidebar_state="collapsed"  # Oculta a sidebar inicialmente
)

# mongodb_URI = os.getenv("mongodb_URI")
# mongodb_URI = st.secrets["database"]["uri"]
mongodb_URI = os.getenv("MONGO_URI")
uri = mongodb_URI

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client['test']
purchase_collection = db['purchasings']

cursor = purchase_collection.find({}, {
    "ticker": 1,
    "purchaseValue": 1,
    "quantity": 1,
    "purchaseDate": 1,
    "_id": 0
})

data = list(cursor)

df = pd.DataFrame(data)

# Calcular o valor total investido por linha
df['totalInvestido'] = df['purchaseValue'] * df['quantity']

df_grouped = df.groupby(['purchaseDate', 'ticker']).agg({'totalInvestido': 'sum'}).reset_index()

df_grouped1 = df.groupby(['purchaseDate', 'ticker']).agg({'totalInvestido': 'sum'}).reset_index()

fig1 = px.line(
    df_grouped1,
    x='purchaseDate',
    y='totalInvestido',
    color='ticker',
    title='Investimentos por dia por ativo',
    markers=True,
    labels={
        'purchaseDate': 'Data da compra',
        'totalInvestido': 'Total investido (R$)',
        'ticker': 'Ativo'
    }
)

df_grouped2 = df.groupby(['purchaseDate', 'ticker']).agg({'quantity': 'sum'}).reset_index()

fig2 = px.line(
    df_grouped2,
    x='purchaseDate',
    y='quantity',
    color='ticker',
    title='Quantidade total comprada por dia',
    markers=True,
    labels={
        'purchaseDate': 'Data',
        'quantity': 'Quantidade',
        'ticker': 'Ativo'
    }
)

st.plotly_chart(fig1)
st.plotly_chart(fig2)