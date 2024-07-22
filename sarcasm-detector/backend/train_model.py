import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import BernoulliNB
import joblib

# Load data from JSON file
data = pd.read_json("Sarcasm.json")

# Select relevant columns
data = data[["headline", "is_sarcastic"]]

# Convert to numpy arrays
x = np.array(data["headline"])
y = np.array(data["is_sarcastic"])

# Initialize the CountVectorizer
cv = CountVectorizer()

# Fit and transform the data
X = cv.fit_transform(x)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

# Initialize and train the model
model = BernoulliNB()
model.fit(X_train, y_train)

# Save model and vectorizer
joblib.dump(model, 'model.pkl')
joblib.dump(cv, 'vectorizer.pkl')

print("Model and vectorizer saved!")