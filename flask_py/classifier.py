# Importing the Modules
import numpy as np
import pandas as pd

# Importing the Libraries
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from PIL import Image

# Fetch the data from the local npz and csv file and store it in a variable X and y
X = np.load('flask_py\datasets\image.npz')['arr_0']
y = pd.read_csv('flask_py\datasets\labels.csv')['labels']

# Print the value counts of the labels using pd.Series(y)
print(pd.Series(y).value_counts())

# Training & Testing the data
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=3500, test_size=500, random_state=9)

# Scaling the data
X_train_scaled = X_train / 255.0
X_test_scaled = X_test / 255.0

# Calculating the Logistic Regression using saga and multinomial and storing in the variable clf
clf = LogisticRegression(solver='saga', multi_class='multinomial').fit(X_train_scaled, y_train)

# Getting the prediction using the test data from image file
def get_prediction(file):
    # Reading the image file
    im_pil = Image.open(file)
    # Converting PIL image to grayscale - 'L' Format
    image_bw = im_pil.convert('L')
    # Resizing the image
    image_bw_resized = image_bw.resize((22, 30), Image.ANTIALIAS)
    # Setting the pixel filter
    pixel_filter = 20
    # Setting the min and max pixel
    min_pixel = np.percentile(image_bw_resized, pixel_filter)
    image_bw_resized_inverted_scaled = np.clip(image_bw_resized-min_pixel, 0, 255)
    max_pixel = np.max(image_bw_resized)
    # Creating test sample
    test_sample = np.array(image_bw_resized_inverted_scaled).reshape(1, 660)
    # Getting the prediction
    prediction = clf.predict(test_sample)
    # Returning the prediction
    return prediction[0]