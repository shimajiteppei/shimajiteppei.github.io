import shutil
import os

def on_post_build(config):
    docs_dir = config['docs_dir']
    site_dir = config['site_dir']

    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith(".md"):
                src = os.path.join(root, file)
                rel = os.path.relpath(src, docs_dir)
                rel_html = os.path.splitext(rel)[0] + ".html"
                html_path_in_site = os.path.join(site_dir, rel_html)

                if os.path.exists(html_path_in_site):
                    dst = os.path.join(site_dir, rel)
                    os.makedirs(os.path.dirname(dst), exist_ok=True)
                    shutil.copyfile(src, dst)
