import os
import json

def generate_md_file_list(root_dir, output_file):
    md_files = []

    # 遍历所有子文件夹和文件
    for dirpath, _, filenames in os.walk(root_dir):
        for file in filenames:
            if file.endswith('.md'):  # 只提取 .md 文件
                relative_path = os.path.relpath(os.path.join(dirpath, file), root_dir)
                md_files.append(relative_path)

    # 生成 JSON 数据
    file_list = {"files": md_files}

    # 将结果写入 fileList.json
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(file_list, f, indent=2, ensure_ascii=False)

    print(f"Markdown file list generated: {md_files}")

if __name__ == "__main__":
    public_dir = os.path.join(".", "public")  # 自动处理分隔符
    output_file = os.path.join(public_dir, "fileList.json")  # 输出文件路径

    generate_md_file_list(public_dir, output_file)
