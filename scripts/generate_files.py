import os
import json
import re
from datetime import datetime, timezone  # 修改这里

def get_front_matter(md_file):
    """从 Markdown 文件中提取 YAML front matter"""
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 使用正则表达式提取 YAML front matter
    front_matter_pattern = r"^---\s*\n(.*?)\n^---\s*$"
    match = re.search(front_matter_pattern, content, re.DOTALL | re.MULTILINE)

    if match:
        front_matter = match.group(1)
        title_match = re.search(r'^title:\s*(.+)', front_matter, re.MULTILINE)
        abstract_match = re.search(r'^abstract:\s*(.+)', front_matter, re.MULTILINE)
        category_match = re.search(r'^category:\s*(.+)', front_matter, re.MULTILINE)

        title = title_match.group(1) if title_match else '无标题'
        abstract = abstract_match.group(1) if abstract_match else ''
        category = category_match.group(1) if category_match else '未分类'
        return {'title': title, 'abstract': abstract, 'category': category}

    return {'title': '无标题', 'category': '未分类'}

def generate_md_file_list_with_metadata(root_dir, output_file):
    md_files = []

    # 遍历所有子文件夹和文件
    for dirpath, _, filenames in os.walk(root_dir):
        for file in filenames:
            if file.endswith('.md'):  # 只提取 .md 文件
                file_path = os.path.join(dirpath, file)

                # 获取文件的前端信息
                front_matter = get_front_matter(file_path)
                title = front_matter.get('title', '无标题')
                abstract = front_matter.get('abstract', '')
                category = front_matter.get('category', '未分类')  # 获取分类，默认未分类

                # 获取文件的最后修改时间
                modified_time = os.path.getmtime(file_path)
                modified_time_obj = datetime.fromtimestamp(modified_time, timezone.utc)  # 修改这里
                modified_time_str = modified_time_obj.strftime('%Y-%m-%d %H:%M:%S')

                # 将文件的路径、标题、分类和修改时间加入列表
                relative_path = os.path.relpath(file_path, root_dir)
                md_files.append({
                    'path': relative_path,
                    'title': title,
                    'abstract': abstract,
                    'category': category,
                    'modified_time': modified_time_str
                })

    # 生成 JSON 数据
    file_list = {"files": md_files}

    # 将结果写入 fileList.json
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(file_list, f, indent=2, ensure_ascii=False)

    print(f"Markdown file list with metadata generated: {md_files}")

if __name__ == "__main__":
    public_dir = os.path.join(".", "public")  # 自动处理分隔符
    articles_dir = os.path.join(public_dir, "articles")  # 文章目录
    output_file = os.path.join(public_dir, "fileList.json")  # 输出文件路径

    generate_md_file_list_with_metadata(articles_dir, output_file)
