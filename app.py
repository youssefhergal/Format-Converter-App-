import xmltodict
from flask import Flask, render_template, request, json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        try:
            # Récupérer le contenu XML depuis le formulaire ou le fichier uploadé
            xml_content = request.form['xml_content']
            xml_file = request.files['xml_file']

            if xml_file:
                # Si un fichier est uploadé, lire son contenu
                xml_content = xml_file.read().decode('utf-8')

            # Convertir XML en dictionnaire Python
            xml_dict = xmltodict.parse(xml_content)

            # Convertir le dictionnaire Python en JSON
            json_data = json.dumps(xml_dict, indent=2)

            # Rendre le template avec le JSON et le contenu XML
            return render_template('index.html', json_data=json_data, xml_content=xml_content)
        except Exception as e:
            return render_template('index.html', erreur=str(e))

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
